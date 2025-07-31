import { notification } from "antd";

export const showMessage = ({ type = "info", title, description }) => {
  notification[type]({
    message: title,
    description,
    placement: "topRight",
  });
};
