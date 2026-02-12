import { useMemo } from "react";

export function useFilteredProducts({ products, search, filters, priceRange }) {
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search tên
      const matchSearch =
        !search ||
        String(item.name).toLowerCase().includes(search.toLowerCase());

      // Search từng loại
      const matchYear =
        filters.year.length === 0 || filters.year.includes(item.year);

      const matchBrand =
        filters.brand.length === 0 || filters.brand.includes(item.brand);

      const matchModel =
        filters.model.length === 0 || filters.model.includes(item.model);

      const matchBodyType =
        filters.bodyType.length === 0 ||
        filters.bodyType.includes(item.bodyType);

      const matchTransmission =
        filters.transmission.length === 0 ||
        filters.transmission.includes(item.transmission);

      const matchFuelType =
        filters.fuelType.length === 0 ||
        filters.fuelType.includes(item.fuelType);

      // Gía
      const matchPrice =
        item.price == null ||
        (item.price >= priceRange[0] && item.price <= priceRange[1]);

      return (
        matchSearch &&
        matchYear &&
        matchBrand &&
        matchModel &&
        matchBodyType &&
        matchTransmission &&
        matchFuelType &&
        matchPrice
      );
    });
  }, [products, search, filters, priceRange]);

  return filteredProducts;
}
