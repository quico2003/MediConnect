import { Button, Pagination } from "react-bootstrap";

const CustomPagination = ({ totalPages, page: currentPage, onChange }) => {
  const handlePage = (pageSelected) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onChange(pageSelected);
  };

  const PageButton = ({ icon, page, active, border = true, disabled }) => (
    <Button
      variant={`${
        disabled ? "light" : active ? "secondary" : "outline-secondary"
      }`}
      style={{ height: 40, width: 40 }}
      className={`d-flex justify-content-center align-items-center shadow-none rounded-circle ${
        border ? "border" : "border-0"
      }`}
      onClick={() => page !== currentPage && handlePage(page)}
    >
      {icon || page}
    </Button>
  );

  const onePage = () => (
    <div className="mb-0 d-flex align-items-center justify-content-center">
      <PageButton active border={false} page={1} />
    </div>
  );

  const twoPages = () => (
    <div className="mb-0 d-flex align-items-center justify-content-center">
      <PageButton active={currentPage === 1} border={false} page={1} />
      <PageButton active={currentPage === 2} border={false} page={2} />
    </div>
  );

  const threePages = () => (
    <div className="mb-0 d-flex align-items-center justify-content-center">
      <PageButton active={currentPage === 1} border={false} page={1} />
      <PageButton active={currentPage === 2} border={false} page={2} />
      <PageButton active={currentPage === 3} border={false} page={3} />
    </div>
  );

  const moreThanThreePages = () => (
    <div className="mb-0 d-flex align-items-center justify-content-center">
      <PageButton
        disabled={currentPage === 1}
        icon={
          <i style={{ fontSize: "1rem" }} className="material-icons">
            &#xe2ea;
          </i>
        }
        page={1}
      />
      <PageButton
        active={currentPage === 1}
        border={false}
        page={
          currentPage === 1
            ? 1
            : currentPage === totalPages
            ? currentPage - 2
            : currentPage - 1
        }
      />
      <PageButton
        active={currentPage !== 1 && currentPage !== totalPages}
        border={false}
        page={
          currentPage === 1
            ? currentPage + 1
            : currentPage === totalPages
            ? currentPage - 1
            : currentPage
        }
      />
      <PageButton
        active={currentPage === totalPages}
        border={false}
        page={
          currentPage === 1
            ? currentPage + 2
            : currentPage === totalPages
            ? currentPage
            : currentPage + 1
        }
      />
      {/* <Pagination.Next /> */}
      <PageButton
        disabled={totalPages === currentPage}
        icon={
          <i style={{ fontSize: "1rem" }} className="material-icons">
            &#xe5e1;
          </i>
        }
        page={totalPages}
      />
    </div>
  );

  const renderPagination = () => {
    switch (totalPages) {
      case 1:
        return onePage();
      case 2:
        return twoPages();
      case 3:
        return threePages();
      default:
        return moreThanThreePages();
    }
  };

  return (
    totalPages > 0 && (
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        <Pagination>{renderPagination()}</Pagination>
      </div>
    )
  );
};

export default CustomPagination;
