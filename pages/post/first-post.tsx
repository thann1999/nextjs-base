interface Props {
  posts: any;
}

function FirstPost() {
  return (
    <>
      <h1>Hello first post</h1>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//   return {
//     props: {
//       posts: res.data,
//     },
//   };
// }

export default FirstPost;
