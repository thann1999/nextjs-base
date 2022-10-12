import { ProductAPI } from '#apis/product.api';
import { Product } from '#interfaces/product.interface';
import { toPromise } from 'utils/helper';

interface Props {
  products: Product[];
}

function FirstPost({ products }: Props) {
  return (
    <>
      <h1>Product list</h1>
      {products?.map((item) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const response = await toPromise(ProductAPI.getListProduct());
  return {
    props: {
      products: response?.products || [],
    },
  };
}

export default FirstPost;
