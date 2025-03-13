import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import PlayerCard from "../Components/PlayerPanel/PlayerCard";

const { maxResults } = Configuration.search.players;

const PlayersPanel = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Search.Players;

  const request = useRequest();
  const searchParams = useQuery();

  const { search } = useLocation();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = () => {
    setLoaded(false);
    const search = searchParams.get("search");

    request("get", getEndpoint(Endpoints.Search.players.get), {
      search,
      offset: maxResults,
    })
      .then((res) => {
        setData(res.data);
        setTotalResults(res.totalResults);
      })
      .catch((err) => errorNotification(err.message))
      .finally(() => setLoaded(true));
  };

  return (
    <SectionLayout title={ViewStrings.title} loaded={loaded}>
      {data.length === 0 ? (
        <div className="w-100 py-4 d-flex justify-content-center">
          <p className="mb-0 h6 text-muted">No results</p>
        </div>
      ) : (
        <Row>
          {data.map((player) => (
            <Col xs={12} sm={6} xl={4} xxl={3}>
              <PlayerCard key={player.guid} {...player} />
            </Col>
          ))}
        </Row>
      )}

      {totalResults > maxResults && (
        <div className="d-flex align-items-center justify-content-end">
          <IconButton
            as={Link}
            to={replacePaths(
              Paths[Views.organisations],
              [],
              [{ search: searchParams.get("search") }]
            )}
            title={ViewStrings.viewMore.replace(
              "%items.amount%",
              totalResults - data.length
            )}
          />
        </div>
      )}
    </SectionLayout>
  );
};

export default PlayersPanel;
