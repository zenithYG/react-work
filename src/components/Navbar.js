import React from 'react';

function Navbar() {
    const handleHomeClick = () => {
        if (process.env.NODE_ENV === 'production') {
            // 배포 환경일 때 (GitHub Pages에서)
            window.location.href = 'https://zenithyg.github.io/react-work';
        } else {
            // 로컬 개발 환경일 때
            window.location.href = '/';
        }
    };

    return (
        <div style={styles.navbar}>
            <button style={styles.homeButton} onClick={handleHomeClick}>
                Home
            </button>
        </div>
    );
}

const styles = {
    navbar: {
        position: 'fixed',    // 화면에 고정
        top: 0,               // 화면의 상단에 고정
        left: 0,              // 좌측 끝에 고정
        width: '100%',        // 너비를 화면 가득 채움
        padding: '10px 0',    // 상하 padding만 적용, 좌우 padding 제거
        backgroundColor: '#f8f9fa',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자 효과
        zIndex: 1000,         // 다른 요소보다 위에 표시되도록 z-index 설정
        display: 'flex',      // Flexbox 사용
        justifyContent: 'flex-end',  // 우측 끝에 정렬
    },
    homeButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginRight: '10px',  // 버튼이 화면 가장자리에 너무 붙지 않도록 여유 공간 추가
    },
};

export default Navbar;
