import Head from 'next/head';
// import products from '../../products.json';
import { fromImageToUrl, API_URL } from '../../utils/urls';
import { twoDecimals } from '../../utils/format';

// const product = products[0];

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name='description' content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} alt='' />
      <h3>{product.name}</h3>
      <p>${twoDecimals(product.price)}</p>
      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const product = await res.json();

  return {
    props: {
      // Because the API response for filters is an array
      product: product[0],
    },
  };
}

export async function getStaticPaths() {
  // Retrieve all the possible paths
  const res = await fetch(`${API_URL}/products/`);
  const products = await res.json();
  // Return them to NextJS context
  return {
    paths: products.map(product => ({
      params: {
        slug: String(product.slug),
      },
    })),
    // Tell NextJS to show 404 if the param is not matched
    fallback: false,
  };
}

export default Product;
