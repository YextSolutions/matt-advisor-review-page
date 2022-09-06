import cx from "classnames";
import * as React from "react";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  //Insert Props Here
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ className, children, title }: Props) => {
  return (
    <div
      className={cx(
        className,
        "py-4 px-4 sm:px-8 max-w-screen-lg md:my-8 lg:my-12 mx-auto"
      )}
    >
      <Helmet>{title && <title>{title}</title>}</Helmet>
      <div className="flex flex-col gap-8">{children}</div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
