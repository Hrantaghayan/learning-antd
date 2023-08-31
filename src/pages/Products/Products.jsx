import { useLocation } from "react-router";
import { Row, Col, Image, Divider, Space, Typography, Rate } from "antd";
import "./Products.scss";
import { useState } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const Products = () => {
  const { state } = useLocation();
  const [images, setImages] = useState(
    state.images.slice(0, 4)
  );
  const [selectedIMage, setselectedIMage] = useState(images[0]);
  const onDownload = () => {
    fetch(selectedIMage)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  const description = (obj) => {
    const res = [];
    let i = 0;
    for (let key in obj) {
      if (key !== "images" && key !== "thumbnail") {
        res.push(
          <Space key={i}>
            <div style={{width:"100px"}}>
            <Typography.Text
              strong
              style={{
                width:"100px",
                fontSize: "16px",
              }}
            >
              {key === "title" ? "model" : key}
            </Typography.Text>
            </div>
            ------------------
            {key === "rating" ? (
              <>
                <Rate
                  value={obj[key]}
                  allowHalf={true}
                  disabled
                  // style={{
                  //   marginRight: "5px",
                  // }}
                />
                <span>{obj[key]}</span>
              </>
            ) : (
              <Typography.Text
              className="splitableText"
                italic
                style={{
                  fontSize: "18px",
                }}
                copyable={{
                  icon: <CopyOutlined style={{ color: "black",fontSize:"16px" }} />,
                  tooltips: ["click here", "you clicked!!"],
                }}
              >
                {key === "price"
                  ? `${obj[key]}$`
                  : key === "discountPercentage"
                  ? `${obj[key]}%`
                  : obj[key]}
              </Typography.Text>
            )}
          </Space>
        );
      }
      i = i + 1;
    }
    return res;
  };
  return (
    <div className="products">
      <div className="imageCont">
        <Row style={{ width: "100%" }}>
          <Col
            span={24}
            style={{
              width: "100%",
            }}
          >
            <Image
              src={selectedIMage}
              style={{ width: "100%",height:"350px" }}
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                  }
                ) => (
                  <Space
                    //   size={25}
                    className="toolbar-wrapper"
                  >
                    <DownloadOutlined
                      onClick={onDownload}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <SwapOutlined
                      rotate={90}
                      onClick={onFlipY}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <SwapOutlined
                      onClick={onFlipX}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <RotateLeftOutlined
                      onClick={onRotateLeft}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <RotateRightOutlined
                      onClick={onRotateRight}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <ZoomOutOutlined
                      disabled={scale === 1}
                      onClick={onZoomOut}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <ZoomInOutlined
                      disabled={scale === 50}
                      onClick={onZoomIn}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                  </Space>
                ),
                // width:"700px"
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {images.map((el, i) => (
            <Col span={5} key={i}>
              <img
                src={images[i]}
                onClick={() => {
                  setselectedIMage(images[i]);
                }}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  height: "150px",
                  maxWidth: "170px",
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className="infoCont">{description(state)}</div>
    </div>
  );
};
export default Products;
