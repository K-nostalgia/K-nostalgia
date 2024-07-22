export default function Login() {
  return (
    <div className="min-h-screen items-center justify-center bg-normal hidden xs:flex">
      <div>
        <h3 className="hidden xs:block text-xl font-bold mb-6 text-center text-label-strong">
          반갑습니다! 항그리움입니다:)
        </h3>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  text-label-strong"
            >
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              className="mt-1 w-full px-3 py-2 border border-label-assistive text-label-assistive rounded-xl focus:outline-none  focus:border-primary-strong  xs:text-xs"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium  text-label-strong"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="mt-1 w-full px-3 py-2 border  border-label-assistive   text-label-assistive rounded-xl focus:outline-none focus:border-primary-strong xs:text-xs"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-xl text-sm text-white bg-label-disable hover:bg-primary-strong"
          >
            입장하기
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-label-alternative">
          아직 회원이 아니신가요?{' '}
          <a href="#" className="font-medium text-label-normal">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
