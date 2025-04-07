import { useEffect, useMemo, useState } from "react";
import { Accordion, Card, Col, Row, useAccordionButton } from "react-bootstrap";
import { Configuration } from "../../Config/app.config";
import Searcher from "../Searcher/Searcher";
import PageSizeComponent from "./Components/PageSizeComponent";
import CustomPagination from "./Components/Pagination";
import TableComponent from "./Components/TableComponent";
import NotFoundComponent from "../NotFoundComponent";
import IconButton from "../Buttons/IconButton";
import { IoFilter } from "react-icons/io5";
import { debounce } from 'lodash';

const ReactTable = ({
  fetching,
  columns,
  searcherProps = {},
  useFilter,
  extraFilters,
  emptyData = {},
  showPageSize = true,
  showSearcher = true,
  data,
  totalPages = 1,
  onEventChange,
}) => {
  const [currentPageSize, setCurrentPageSize] = useState(
    Configuration.tables.defaultPageSize
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");

  const handlePageSize = (size) => {
    fetchData(1, size, currentSearch);
  };

  const handleSearcher = (search) => {
    fetchData(currentPage, currentPageSize, search);
  };

  const handlePagination = (page) => {
    fetchData(page, currentPageSize, currentSearch);
  };

  const fetchData = (page, offset, search) => {
    onEventChange(page, offset, search);
    setCurrentPage(page);
    setCurrentPageSize(offset);
    setCurrentSearch(search);
  };

  function ContextAwareToggle({ eventKey, callback }) {
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    return (
      <IconButton
        Icon={IoFilter}
        onClick={decoratedOnClick}
        size={20}
      ></IconButton>
    );
  }

  const renderHeader = () => (
    <Row className="d-flex flex-column-reverse flex-md-row">
      <Col sm={12} md={6} className="mb-md-2 mb-1">
        {useFilter && <ContextAwareToggle eventKey="0"></ContextAwareToggle>}
      </Col>
      <Col sm={12} md={6} className="mb-md-2 mb-1">
        <div className="d-flex align-items-center justify-content-end">
          {showSearcher && (
            <div className="ms-1 d-flex justify-content-end align-items-center">
              <Searcher
                autoFocus={searcherProps?.autoFocus}
                placeholder={searcherProps?.placeholder}
                ref={searcherProps?.ref}
                onChange={handleSearcher}
              />
            </div>
          )}
          {showPageSize && (
            <div className="ms-1 d-flex justify-content-end align-items-center">
              <PageSizeComponent
                pageSize={currentPageSize}
                onChange={handlePageSize}
              />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );

  return (
    <Accordion>
      {renderHeader()}
      {useFilter && (
        <Accordion.Collapse eventKey="0">
          <Card.Body>{extraFilters}</Card.Body>
        </Accordion.Collapse>
      )}
      {useMemo(
        () =>
          data.length > 0 ? (
            <TableComponent
              fetching={fetching}
              className="mb-2"
              data={data}
              columns={columns}
            />
          ) : (
            <NotFoundComponent
              buttonText={emptyData.buttonText}
              description={emptyData.description}
              text={emptyData.text}
              to={emptyData.to}
              subDescription={emptyData.subDescription}
              size={0.73}
            />
          ),
        [data, emptyData.text]
      )}
      <CustomPagination
        totalPages={totalPages}
        page={currentPage}
        onChange={handlePagination}
      />
    </Accordion>
  );
};

export default ReactTable;
