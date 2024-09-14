'use client';

const CustomerHeader = () => {
  return (
    <header className="gap-6 flex flex-col justify-center items-center">
      <div className="bg-primary-70 w-full py-6 px-4 mt-16 flex flex-col items-center justify-center">
        <p className="text-primary-10 text-xl md:text-3xl font-semibold md:mt-14">
          향그리움 고객센터
        </p>
        <p className="text-primary-10 text-base md:text-xl font-semibold mt-1">
          어떤 도움이 필요하신가요?
        </p>

        {/* 검색창 */}
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="검색을 통해 원하는 정보를 찾아보세요"
            className="placeholder:text-label-assistive border border-primary-20 bg-white rounded-[6px] py-2 px-3 pr-8 w-[343px] md:w-full focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.1333 12.25C19.1333 16.0516 16.0516 19.1333 12.25 19.1333C8.44844 19.1333 5.36667 16.0516 5.36667 12.25C5.36667 8.44844 8.44844 5.36667 12.25 5.36667C16.0516 5.36667 19.1333 8.44844 19.1333 12.25ZM17.1551 19.4969C15.756 20.4457 14.0678 21 12.25 21C7.41751 21 3.5 17.0825 3.5 12.25C3.5 7.41751 7.41751 3.5 12.25 3.5C17.0825 3.5 21 7.41751 21 12.25C21 14.5826 20.0872 16.7021 18.5994 18.2707L24.5142 23.1997C24.9102 23.5297 24.9637 24.1182 24.6337 24.5142C24.3037 24.9102 23.7152 24.9637 23.3192 24.6337L17.1551 19.4969Z"
                fill="#755428"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
