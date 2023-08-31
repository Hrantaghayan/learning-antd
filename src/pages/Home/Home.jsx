import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Rate,
  Typography,
  Pagination,
  Space,
  Spin,
} from "antd";
import "./Home.scss";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  const [isLOading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [items, setItems] = useState([]);
  const fetchData = async (skip) => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=12&skip=${skip}`
    );
    const products = await data.json();
    setIsloading(false);
    setTotalPages(products.total);
    setItems(products.products);
  };
  useEffect(() => {
    fetchData(0);
  }, []);
  const naviGateItemPage = (id, info) => {
    navigate(`/product/${id}`, { state: info });
  };
  return (
    <div className="Home">
      <Typography.Title
        style={{
          color: "orange",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Products
      </Typography.Title>
      {isLOading ? (
        <div style={{
          width:"100%",
          height:"75vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <Spin  size="large"/>
        </div>
      ) : (
        <>
          <Row
            gutter={[16, 25]}
            style={{
              display: "flex",
              flexWrap: "wrap",
              overflowX: "hidden",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            {items.map((el) => (
              <Col span={6} key={el.id}>
                <Card
                  onClick={() => {
                    naviGateItemPage(el.id, el);
                  }}
                  hoverable
                  loading={isLOading}
                  style={{
                    width: "300px",
                    height: "100%",
                  }}
                  cover={
                    <img
                      src={el?.images?.[0]}
                      alt="ProductIMage"
                      style={{ width: "300px", height: "300px" }}
                    />
                  }
                >
                  <Card.Meta
                    title={el?.brand}
                    description={
                      <div className="description">
                        <Typography.Text>{el?.description}</Typography.Text>
                        <div className="priceCont">
                          <Typography.Text>Model:</Typography.Text>
                          <Typography.Text>{el?.title}</Typography.Text>
                        </div>
                        <div className="priceCont">
                          <Typography.Text>Price:</Typography.Text>
                          <Typography.Text>{el?.price}$:</Typography.Text>
                        </div>
                        <div className="priceCont">
                          <Typography.Text>Rating:</Typography.Text>
                          <Rate
                            value={el?.rating}
                            allowHalf={true}
                            disabled
                            style={{
                              marginRight: "5px",
                            }}
                          />
                          <span>{el?.rating}</span>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Space
            size={50}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Pagination
              total={totalPages}
              showQuickJumper
              current={currentPage}
              style={{
                marginBottom: "20px",
              }}
              hideOnSinglePage={true}
              pageSize={12}
              responsive={true}
              onChange={(val) => {
                setCurrentPage(val);
                fetchData(val * 12 - 12);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Space>
        </>
      )}
    </div>
  );
};
export default Home;
