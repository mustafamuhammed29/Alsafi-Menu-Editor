import React from 'react';
import MenuPageLayout from './MenuPageLayout';
import InfoPageLayout from './InfoPageLayout';
import { useMenu } from '../../context/MenuContext';
import { validateMenuForExport } from '../../utils/menuValidator';

export const A4Page = ({ pageData, pageIndex, pageSettings }) => {
  const {
    updateHeader,
    updateCategory,
    updateItem,
    updatePageImage,
    updateImageTransform,
    resetImageTransform,
  } = useMenu();



  return (
    <div className="flex flex-col items-center relative group print:block print:m-0 print:p-0 print:w-[210mm]">
      {/* Main A4 Page Renderer */}
      {pageData.layout === 'info' ? (
        <InfoPageLayout
          pageData={pageData}
          pageIndex={pageIndex}
          pageSettings={pageSettings}
          onUpdateHeader={updateHeader}
        />
      ) : (
        <MenuPageLayout
          pageData={pageData}
          pageIndex={pageIndex}
          pageSettings={pageSettings}
          onUpdateHeader={updateHeader}
          onUpdateCategory={updateCategory}
          onUpdateItem={updateItem}
          onUpdateImage={updatePageImage}
          onImageTransform={updateImageTransform}
          onResetTransform={resetImageTransform}
        />
      )}
    </div>
  );
};

export default A4Page;
