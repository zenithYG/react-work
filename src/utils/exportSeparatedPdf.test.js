import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import exportSeparatedPdf from './exportSeparatedPdf';
import exportOnePagePdf from './exportOnePagePdf';

const mockAddImage = jest.fn();
const mockSave = jest.fn();

jest.mock('html2canvas', () => jest.fn());
jest.mock('jspdf', () => jest.fn(() => ({ addImage: mockAddImage, save: mockSave })));

const originalFetch = global.fetch;
let page;
let canvas;

beforeEach(() => {
    jest.clearAllMocks();
    jsPDF.mockImplementation(() => ({ addImage: mockAddImage, save: mockSave }));
    canvas = { width: 2000, height: 4000, toDataURL: jest.fn(() => 'lossless-png') };
    html2canvas.mockResolvedValue(canvas);
    page = document.createElement('div');
    page.getBoundingClientRect = () => ({ left: 10, top: 20, width: 1000, height: 2000 });
});

afterEach(() => {
    global.fetch = originalFetch;
});

function addPhoto() {
    const image = document.createElement('img');
    image.src = '/photo.jpg';
    image.setAttribute('data-pdf-original-image', '');
    image.decode = jest.fn().mockResolvedValue();
    Object.defineProperties(image, {
        naturalWidth: { value: 1181 },
        naturalHeight: { value: 1575 }
    });
    image.getBoundingClientRect = () => ({ left: 830, top: 60, width: 90, height: 120 });
    page.appendChild(image);
    return image;
}

test('exports documents without a photo as a lossless single-page image', async () => {
    await exportSeparatedPdf(page, 'introduction.pdf');

    expect(canvas.toDataURL).toHaveBeenCalledWith('image/png');
    expect(mockAddImage).toHaveBeenCalledWith('lossless-png', 'PNG', 8, 8, 194, 388);
    expect(jsPDF).toHaveBeenCalledWith(expect.objectContaining({ format: [210, 404] }));
    expect(mockSave).toHaveBeenCalledWith('introduction.pdf');
});

test.each([exportSeparatedPdf, exportOnePagePdf])('%p preserves the original photo bytes and aspect ratio', async (exportPdf) => {
    const image = addPhoto();
    const bytes = new Uint8Array([255, 216, 255, 217]);
    global.fetch = jest.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => bytes.buffer });

    await exportPdf(page, 'resume.pdf');

    expect(image.decode).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(image.src);
    const [data, format, x, y, width, height] = mockAddImage.mock.calls[1];
    expect(data).toEqual(bytes);
    expect(format).toBe('JPEG');
    expect(x).toBeCloseTo(8 + (820 + (90 - 1181 * 120 / 1575) / 2) * 0.194);
    expect(y).toBeCloseTo(8 + 40 * 0.194);
    expect(width / height).toBeCloseTo(1181 / 1575);
    expect(height).toBeCloseTo(120 * 0.194);
    expect(mockSave).toHaveBeenCalledWith('resume.pdf');
});

test('does not save a degraded fallback when the original photo cannot be loaded', async () => {
    addPhoto();
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    await expect(exportSeparatedPdf(page, 'resume.pdf')).rejects.toThrow('Failed to load original resume photo');
    expect(mockSave).not.toHaveBeenCalled();
});
