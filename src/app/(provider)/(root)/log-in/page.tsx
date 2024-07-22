import { GoArrowLeft } from 'react-icons/go';

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-normal p-8 rounded-md hidden xs:flex">
      <div className="w-full max-w-md">
        <GoArrowLeft className="mb-4 text-2xl cursor-pointer" />
        <div className="mb-4">
          <h3 className="text-{20px} font-bold mb-6 text-left text-label-strong">
            반갑습니다! 항그리움입니다:)
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-label-normal mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력해 주세요"
                className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-label-normal"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-label-normal mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-label-normal"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-label-disable text-white rounded-xl hover:bg-primary-strong"
            >
              입장하기
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-label-alternative">
            아직 회원이 아니신가요?{' '}
            <a href="/sign-up" className="font-medium text-label-normal">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
