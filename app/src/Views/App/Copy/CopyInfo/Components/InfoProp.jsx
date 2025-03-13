const InfoProps = ({ title, data }) => {
  return (
    <div className="d-flex w-100  py-2">
      <b className="w-50 align-content-center ">{title}:</b>
      <p className="mb-1 w-50">{data}</p>
    </div>
  );
};

export default InfoProps;
