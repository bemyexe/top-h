import type {CategoriesDTO, ChartData} from '../api/api';

interface Dataset {
  label: string;
  data: number[];
}

export const formatChartDataToDatasets = (
  chartData: ChartData,
  categories: CategoriesDTO[],
  idSubСategory: Record<number, string>,
  allDatesInRange: string[]
): Dataset[] => {
  if (!chartData) return [];

  const datasets: Dataset[] = [];

  Object.entries(chartData).forEach(([categoryIdStr, categoryData]) => {
    const categoryId = parseInt(categoryIdStr);

    const category =
      categories.find((cat) => cat.id === categoryId) ||
      categories
        .flatMap((cat) => cat.categories)
        .find((c) => c?.id === categoryId);
    const categoryName = category?.name || `Category ${categoryId}`;

    Object.entries(categoryData).forEach(
      ([subCategoryIdStr, subCategoryData]) => {
        const subCategoryId = parseInt(subCategoryIdStr);

        const dateValues = subCategoryData as Record<string, number>;

        datasets.push({
          label: `${categoryName} - ${idSubСategory[subCategoryId]}`,
          data: allDatesInRange.map((date) => dateValues[date] ?? 0),
        });
      }
    );
  });

  return datasets;
};
