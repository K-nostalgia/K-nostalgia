import React, { useState } from 'react';

const ScrollButton = () => {
  const [selectedSection, setSelectedSection] =
    useState<string>('photos-section');

  const scrollToSection = (sectionId: string) => {
    setSelectedSection(sectionId); // 버튼이 클릭될 때마다 선택된 섹션을 업데이트
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-around w-full h-12 bg-normal">
      <button
        onClick={() => scrollToSection('photos-section')}
        className={`w-20 text-base font-medium text-label-assistive ${
          selectedSection === 'photos-section'
            ? 'w-20 border-b-4 border-primary-20 text-primary-20'
            : ''
        }`}
      >
        사진보기
      </button>
      <button
        onClick={() => scrollToSection('details-section')}
        className={`w-20 text-base font-medium text-label-assistive ${
          selectedSection === 'details-section'
            ? 'w-20 border-b-4 border-primary-20 text-primary-20'
            : ''
        }`}
      >
        상세정보
      </button>
      <button
        onClick={() => scrollToSection('recommend-section')}
        className={`w-20 text-base font-medium text-label-assistive ${
          selectedSection === 'recommend-section'
            ? 'w-20 border-b-4 border-primary-20 text-primary-20'
            : ''
        }`}
      >
        추천시장
      </button>
      <button
        onClick={() => scrollToSection('comments-section')}
        className={`w-20 text-base font-medium text-label-assistive ${
          selectedSection === 'comments-section'
            ? 'border-b-4 border-primary-20 text-primary-20'
            : ''
        }`}
      >
        댓글
      </button>
    </div>
  );
};

export default ScrollButton;
