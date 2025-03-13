import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import useModalManager from "../../../../Hooks/useModalManager";
import { CopiesColumns } from "./CopiesColumns";
import ShowBarcodeModal from "../../../../Modals/BarcodeCopies/ShowBarcodeModal/ShowBarcodeModal";
import IconButton from "../../../../Components/Buttons/IconButton";
import { BiSolidPrinter } from "react-icons/bi";
import PrintCustomModal from "../../../../Modals/BarcodeCopies/PrintCustomModal/PrintCustomModal";
import PrintCustomIndividualModal from "../../../../Modals/BarcodeCopies/PrintCustomModal/PrintCustomIndividualModal";

const Copies = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.AllCopies;

  const request = useRequest();
  const searchParams = useQuery();

  const { book_guid } = useParams();

  const {
    closeModal: closeBarcodeModal,
    openModal: openBarcodeModal,
    show: showBarcodeModal,
    data: barcodeModal,
  } = useModalManager();

  const {
    closeModal: closePrintCustomModal,
    openModal: openPrintCustomModal,
    show: showPrintCustomModal,
    data: bookGuidData,
  } = useModalManager();

  const {
    closeModal: closePrintIndividualCustomModal,
    openModal: openPrintIndividualCustomModal,
    show: showPrintIndividualCustomModal,
    data: uniqidData,
  } = useModalManager();
  const { search } = useLocation();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async (
    page = 1,
    offset = Configuration.tables.defaultPageSize,
    search = searchParams.get("search")
  ) => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Copies.allCopies.getAll),
      {
        book_guid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.copies);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleUpdateState = async (guid, value) => {
    return await request(
      "post",
      getEndpoint(Endpoints.Copies.editCopy.updateState),
      {
        guid,
        state: value,
      }
    )
      .then(() => successNotification(ViewStrings.messages.statusUpdate))
      .catch(errorNotification);
  };

  const handleCloseBarcodeModal = (refresh) => {
    if (refresh) fetchData();
    closeBarcodeModal();
  };

  const handleClosePrintCustomModal = (refresh) => {
    if (refresh) fetchData();
    closePrintCustomModal();
  };
  const handleClosePrintIndividualCustomModal = (refresh) => {
    if (refresh) fetchData();
    closePrintIndividualCustomModal();
  };
  return (
    <>
      {/* Modals */}
      <ShowBarcodeModal
        show={showBarcodeModal}
        onClose={handleCloseBarcodeModal}
        data={barcodeModal}
      />
      <PrintCustomModal
        show={showPrintCustomModal}
        onClose={handleClosePrintCustomModal}
        bookGuid={bookGuidData}
      />
      <PrintCustomIndividualModal
        show={showPrintIndividualCustomModal}
        onClose={handleClosePrintIndividualCustomModal}
        uniqid={uniqidData}
      />

      {/* Content */}
      <GeneralLayout
        showBackButton
        loaded={loaded}
        title={ViewStrings.title}
        rightSection={
          <div className="d-flex gap-3">
            <div>
              <IconButton
                Icon={BiSolidPrinter}
                title={ViewStrings.buttonTitle}
                onClick={() => openPrintCustomModal(book_guid)}
              />
            </div>
            <div>
              <Button
                size="sm"
                as={Link}
                to={replacePaths(Paths[Views.new_copy].path, [{ book_guid }])}
              >
                {ViewStrings.addCopy}
              </Button>
            </div>
          </div>
        }
      >
        <PanelLayout>
          <ReactTable
            searcherProps={{
              placeholder: ViewStrings.placeholder,
              autoFocus: true,
            }}
            emptyData={{
              text: ViewStrings.emptyData.text,
              buttonText: ViewStrings.emptyData.buttonText,
              to: Paths[Views.new_book].path,
              description: ViewStrings.emptyData.description,
              subDescription: ViewStrings.emptyData.subDescription,
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={CopiesColumns(
              handleUpdateState,
              openBarcodeModal,
              openPrintIndividualCustomModal,
              book_guid
            )}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Copies;
