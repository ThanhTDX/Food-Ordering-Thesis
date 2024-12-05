const formatVND = (num) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  }).format(num);
};

export default formatVND;