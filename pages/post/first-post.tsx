import styles from './first-post.module.scss';

interface Props {
  posts: any;
}

function FirstPost() {
  return (
    <>
      <p className={styles.text}>Hello first post</p>
    </>
  );
}

export default FirstPost;
