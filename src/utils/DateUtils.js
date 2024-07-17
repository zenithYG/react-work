
import { Timestamp } from 'firebase/firestore';

export class WorkPeriod {
    constructor(start, end) {
      this.start = new Date(start); // 시작 시간
      this.end = new Date(end); // 종료 시간
    }
  }

export const createDate = (strDate) => {
    const date = new Date(strDate);
    return Timestamp.fromDate(date);
} 

export const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end - start;
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
    const diffInMonths = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    return `${diffInYears}년 ${diffInMonths}개월`;
}

export const calculateDurationCurrent = (startDate) => {
    const start = new Date(startDate);
    const end = new Date();
    const diffInMs = end - start;
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
    const diffInMonths = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    return `${diffInYears}년 ${diffInMonths}개월`;
}

export const calculateTotalDuration = (workPeriods) => {
    let totalMonths = 0;
    let totalYears = 0;
    workPeriods.forEach(period => {
      const start = period.start;
      const end = period.end;
      const years = end.getFullYear() - start.getFullYear();
      const months = end.getMonth() - start.getMonth();
      totalYears += years;
      totalMonths += months;
      // 월이 음수일 경우 연도를 감소시키고 월을 12로 설정
      if (totalMonths < 0) {
        totalYears -= 1;
        totalMonths += 12;
      }
    });
    return `${totalYears}년 ${totalMonths}개월`;
};

export const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};