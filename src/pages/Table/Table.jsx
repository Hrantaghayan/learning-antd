import { Table, Spin, Input, Space } from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";

const Tablee = () => {
  const [dataSource, setDataSource] = useState();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tottalPage, setTotalPage] = useState(0);
  const fetchData = async (page = 0) => {
    const response = await fetch(
      `https://dummyjson.com/users?skip=${page}&limit=10`
    );
    const users = await response.json();
    setDataSource(users.users);
    setIsLoading(false);
    setTotalPage(users.total);
  };
  const citys = dataSource?.map((el) => {
    return {
      text: `${el.address.city}`,
      value: `${el.address.city}`,
    };
  });
  const filteredCitys = (() => {
    if (citys?.length) {
      const citySet = new Set(); // Use a Set to store unique city values
      const filteredCities = [];

      citys.forEach((city) => {
        if (!citySet.has(city.value)) {
          citySet.add(city.value);
          filteredCities.push(city);
        }
      });

      return filteredCities;
    }
  })();
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "FullName",
      dataIndex: "firstName",
      render: (_, user) => {
        return `${user.firstName} ${user.lastName}`;
      },
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      //   filteredValue: [text],
      onFilter: (val, record) => {
        return record.gender.indexOf(val) === 0;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "State",
      dataIndex: "address",
      //   filteredValue:[text],
      //   onFilter:(val,record)=>{
      //     return String(record.address.city).toLowerCase().includes(val.toLowerCase()) ||
      //      String(record.firstName).toLowerCase().includes(val.toLowerCase())||
      //      String(record.lastName).toLowerCase().includes(val.toLowerCase())||
      //      String(record.email).toLowerCase().includes(val.toLowerCase())
      //   },
      filters: filteredCitys,
      render: (address) => {
        return address.city;
      },
      onFilter:(val,record)=>{
       return record.address.city.indexOf(val) === 0;
      }
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Company",
      dataIndex: "company",
      children: [
        {
          title: "Department",
          dataIndex: "department",
          render: (_, record) => {
            return record.company.department;
          },
        },
        {
          title: "Name",
          dataIndex: "name",
          render: (_, record) => {
            return record.company.name;
          },
        },
        {
          title: "Title",
          dataIndex: "title",
          render: (_, record) => {
            return record.company.title;
          },
        },
      ],
    },
  ];
  return (
    <div className="Table-cont">
      {isLoading ? (
        <Spin
          size="large"
          style={{ marginTop: "20px" }}
          className="center-element"
        />
      ) : (
        <Space
          direction="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
 
   <Input.Search
            onSearch={(val) => {
              setText(val);
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{
              marginTop: "20px",
            }}
          />
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={dataSource}
            rowKey={(record) => {
              return record.id;
            }}
            bordered={true}
            pagination={{
              pageSize: 10,
              total: tottalPage,
              onChange: (page) => {
                fetchData(page * 10 - 10);
              },
            }}
          />
        </Space>
      )}
    </div>
  );
};
export default Tablee;
