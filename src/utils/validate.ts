export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  }

  export function validateName(name: string): boolean {
    // 한글과 영어만 허용, 공백 및 특수문자 포함 시 false 반환
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    return nameRegex.test(name);
  }

  export function validateNickName(nickname: string): boolean {
    return nickname.length >=0 && nickname.length <= 12; 
  }
  