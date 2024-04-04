import { useParams } from "react-router-dom";
import { APIGetAllProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { Divider, Input, message, Tooltip } from "antd";
interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}
const MainFilterProduct = () => {
  const [allProductFilter, setAllProductFilter] = useState([]);
  const [valueInputPriceLeft, setValueInputPriceLeft] = useState("");
  const [valueInputPriceRight, setValueInputPriceRight] = useState("");
  const { slug } = useParams<string>();
  console.log(slug);

  const getProductFilterKeyWord = async () => {
    if (slug) {
      const res = await APIGetAllProduct(slug);
      console.log(res);
      if (res.data && res.data.filteredProductCount !== 0) {
        setAllProductFilter(res.data.products);
        message.success(`Lấy sản phẩm với từ khóa là "${slug.split("=")[1]}"`);
      } else {
        message.error(
          `Không tìm thấy sản phẩm với từ khóa là "${slug.split("=")[1]}"`
        );
      }
    }
  };

  useEffect(() => {
    getProductFilterKeyWord();
  }, [slug]);

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  const NumericInputLeft = (props: NumericInputProps) => {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
        onChange(inputValue);
      }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    };

    const title = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? formatNumber(Number(value)) : "-"}
      </span>
    ) : (
      "Nhập giá trị tối thiểu"
    );

    return (
      <Tooltip
        trigger={["focus"]}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Giá trị tối thiểu"
          maxLength={16}
        />
      </Tooltip>
    );
  };
  const NumericInputRight = (props: NumericInputProps) => {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
        onChange(inputValue);
      }
    };
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    };

    const title = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? formatNumber(Number(value)) : "-"}
      </span>
    ) : (
      "Nhập giá trị tối đa"
    );

    return (
      <Tooltip
        trigger={["focus"]}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Giá trị tối đa"
          maxLength={16}
        />
      </Tooltip>
    );
  };
  return (
    <div className="min-h-[600px] pt-5 max-w-[1200px]  mx-auto">
      <div className="text-[25px] mb-[20px]">
        Có {allProductFilter.length} sản phẩm được tìm thấy với từ khóa : "
        {slug?.split("=")[1]}"
      </div>
      <div className="container-content-filter flex gap-[50px] h-[600px]">
        <div className="filter-left-content border w-[300px] border-red-500 p-2">
          <p className="text-[20px]">Tìm kiếm </p>
          <Divider />
          <div className="filter-price">
            <p className="mb-3">Lọc theo giá</p>
            <div className="form-filter-price flex gap-3">
              <NumericInputLeft
                style={{ width: 120 }}
                value={valueInputPriceLeft}
                onChange={setValueInputPriceLeft}
              />
              <NumericInputRight
                style={{ width: 120 }}
                value={valueInputPriceRight}
                onChange={setValueInputPriceRight}
              />
            </div>
          </div>
        </div>

        <div className="product-filtered w-[800px] border border-green-500"></div>
      </div>
    </div>
  );
};

export default MainFilterProduct;
