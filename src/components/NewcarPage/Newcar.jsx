import "./newcar.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState, useMemo } from "react";
import { List, Input, Checkbox, Slider, Collapse, Card } from "antd";
import { useFilteredProducts } from "./hooks/filterbar";
import CarCard from "./CarCard";
const Newcar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [filters, setFilters] = useState({
    brand: [],
    model: [],
    year: [],
    bodyType: [],
    transmission: [],
    fuelType: [],
  });
  const filteredProducts = useFilteredProducts({
    products,
    search,
    filters,
    priceRange,
  });
  const { Panel } = Collapse;

  const brandOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.brand))];
  }, [products]);

  const yearOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.year))];
  }, [products]);

  const modelOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.model))];
  }, [products]);

  const bodyTypeOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.bodyType))];
  }, [products]);

  const transmissionOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.transmission))];
  }, [products]);

  const fuelTypeOptions = useMemo(() => {
    return [...new Set(products.map((item) => item.fuelType))];
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mindx-mockup-server.vercel.app/api/resources/products?apiKey=69513732fdb0c381f6e2b976",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      const product = data?.data?.data || [];
      setProducts(product);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="newcar-container">
        <div className="newcar-navtab">
          <h1>New Cars</h1>
          <p>Homepage - New Cars</p>
        </div>

        <div className="newcar-content">
          <div className="left-column">
            <div>
              <div className="filter-header">
                <h3>Filter</h3>
                <div className="filter-line"></div>
              </div>
              <div className="search-bar">
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="custom-search"
                />
              </div>
            </div>
            <Collapse accordion ghost className="filter-collapse">
              <Panel key="brand" header="Brand">
                <Checkbox.Group
                  options={brandOptions}
                  value={filters.brand}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, brand: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>

              <Panel key="year" header="Year">
                <Checkbox.Group
                  options={yearOptions}
                  value={filters.year}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, year: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>

              <Panel key="model" header="Model">
                <Checkbox.Group
                  options={modelOptions}
                  value={filters.model}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, model: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>

              <Panel key="bodytype" header="Body Type">
                <Checkbox.Group
                  options={bodyTypeOptions}
                  value={filters.bodyType}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, bodyType: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>

              <Panel key="transmission" header="Transmission">
                <Checkbox.Group
                  options={transmissionOptions}
                  value={filters.transmission}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, transmission: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>

              <Panel key="fuelType" header="Fuel Type">
                <Checkbox.Group
                  options={fuelTypeOptions}
                  value={filters.fuelType}
                  onChange={(values) =>
                    setFilters((prev) => ({ ...prev, fuelType: values }))
                  }
                  className="filter-checkbox"
                />
              </Panel>
            </Collapse>
            <div className="price">
              <p>Price range</p>
              <p>$0 - $3000000</p>
              <Slider
                range
                min={0}
                max={3000000}
                step={1000}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>
          </div>

          <div className="right-column">
            <List
              grid={{ gutter: 10, column: 1 }}
              dataSource={filteredProducts}
              pagination={{
                pageSize: 6,
                align: "center",
              }}
              renderItem={(item) => (
                <List.Item>
                  <CarCard car={item}></CarCard>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Newcar;
