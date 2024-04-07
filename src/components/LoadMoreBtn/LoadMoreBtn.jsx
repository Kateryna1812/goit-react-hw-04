import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={css.btn} type="button">
      load more
    </button>
  );
};

export default LoadMoreBtn;