import { useCallback } from "react";
import { useSelector } from 'react-redux'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Button2({ content, onClick, active, disabled }) {
    return (
        <button
            className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-full
      ${active ? "bg-sitebg-50 text-white" : "text-black"}
      ${!disabled
                    ? "bg-gray-100 hover:bg-sitebg-100 hover:text-white"
                    : "text-red-300 bg-gray-100 cursor-not-allowed"
                }
      `}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
}

function PaginationNav1({
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
}) {
    const renderPageLinks = useCallback(() => {
        if (pageCount === 0) return null;
        const visiblePageButtonCount = 5;
        let numberOfButtons =
            pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
        const pageIndices = [pageIndex];
        numberOfButtons--;
        [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
            const pageNumberBefore = pageIndices[0] - 1;
            const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
            if (
                pageNumberBefore >= 0 &&
                (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
            ) {
                pageIndices.unshift(pageNumberBefore);
            } else {
                pageIndices.push(pageNumberAfter);
            }
        });
        return pageIndices.map((pageIndexToMap) => (
            <li key={pageIndexToMap}>
                <Button2
                    content={pageIndexToMap + 1}
                    onClick={() => gotoPage(pageIndexToMap)}
                    active={pageIndex === pageIndexToMap}
                />
            </li>
        ));
    }, [pageCount, pageIndex]);
    return (
        <ul className="flex gap-2">
            <li>
                <Button2
                    content={
                        <div className="flex ml-1">
                            <FaChevronLeft size="0.6rem" />
                            <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                        </div>
                    }
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                />
            </li>
            {renderPageLinks()}
            <li>
                <Button2
                    content={
                        <div className="flex ml-1">
                            <FaChevronRight size="0.6rem" />
                            <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                        </div>
                    }
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                />
            </li>
        </ul>
    );
}

function MenuTablePagination(props) {
    const { t } = useTranslation();
    const { menuState } = useSelector((state) => state);
    const { filter_count } = menuState;

    const { showCount, currentPage } = props.condition;

    const setCurrentPage = (value) => {
        const { setCondition, getData } = props;
        setCondition("currentPage", value);
        getData();
    }

    const total_count = filter_count;
    const total_page = Math.ceil(total_count / showCount);

    return (
        <div className="flex justify-between gap-3 flex-wrap p-12 pr-24 pl-20">
            <div>
                <p>{t("showing")} {showCount * currentPage + 1} {t("to")} {showCount * (currentPage + 1) < total_count ? showCount * (currentPage + 1) : total_count} of {total_count} {t("entries")} </p>
            </div>
            <PaginationNav1
                gotoPage={setCurrentPage}
                canPreviousPage={currentPage > 0}
                canNextPage={currentPage < total_page - 1}
                pageCount={total_page}
                pageIndex={currentPage}
            />
        </div>
    );
}

export default MenuTablePagination;
