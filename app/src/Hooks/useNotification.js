import { useState } from "react";
import { renderToString } from "react-dom/server";

const useNotification = (
  variant = "danger",
  position = "top-right",
  orderBy = "asc",
  ms = 5000
) => {
  const notificationDivElement = document.getElementById("notifications");
  const FADE_TIME = 500;

  const [notifications, setNotifications] = useState([]);

  const removeElement = (element) => {
    element.style.opacity = 0;

    setTimeout(() => {
      const nCopy = [...notifications];
      const index = nCopy.map((item) => item.id).indexOf(element.id);
      nCopy.splice(index, 1);
      setNotifications([...nCopy]);
      element.remove();
    }, FADE_TIME);
  };

  const showNotification = (html = "", showCloseButton = true) => {
    const notificationElement = document.createElement("div");
    notificationElement.id = `alert-${Math.round(Math.random() * 999)}`;
    notificationElement.classList.add(
      "alert",
      `alert-${variant}`,
      "generalNotification"
    );
    notificationElement.role = "alert";
    notificationElement.style.transition = `${FADE_TIME}ms`;
    notificationElement.innerHTML = showCloseButton
      ? `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="w-100">${renderToString(html)}</div>
                    <button onclick="this.parentNode.parentNode.remove()" class="btn btn-${variant} bg-transparent text-${variant} border-0 d-flex justify-content-between align-items-center p-1">
                        <i class="material-icons">&#xe5cd;</i>
                    </button>
                </div>
                `
      : renderToString(html);

    switch (orderBy.toLocaleLowerCase()) {
      case "asc":
        notificationDivElement.append(notificationElement);
        break;
      case "desc":
        notificationDivElement.prepend(notificationElement);
        break;
      default:
        return false;
    }

    setTimeout(() => {
      notificationElement.style.opacity = 1;
    }, 100);

    const notificationElementRect = notificationElement.getBoundingClientRect();
    switch (position) {
      case "top-left":
        notificationDivElement.style.top = 0;
        notificationDivElement.style.left = 0;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "top-center":
        notificationDivElement.style.top = 0;
        notificationDivElement.style.left = `calc(50% - ${
          notificationElementRect.width / 2
        }px)`;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "top-right":
        notificationDivElement.style.top = 0;
        notificationDivElement.style.right = 0;
        notificationDivElement.style.left = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "middle-left":
        notificationDivElement.style.top = `calc(50% - ${
          notificationElementRect.height / 2
        }px)`;
        notificationDivElement.style.left = 0;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "middle-center":
        notificationDivElement.style.top = `calc(50% - ${
          notificationElementRect.height / 2
        }px)`;
        notificationDivElement.style.left = `calc(50% - ${
          notificationElementRect.width / 2
        }px)`;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "middle-right":
        notificationDivElement.style.top = `calc(50% - ${
          notificationElementRect.height / 2
        }px)`;
        notificationDivElement.style.right = 0;
        notificationDivElement.style.left = "unset";
        notificationDivElement.style.bottom = "unset";
        break;
      case "bottom-left":
        notificationDivElement.style.flexDirection = "column-reverse";
        notificationDivElement.style.bottom = 0;
        notificationDivElement.style.left = 0;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.top = "unset";
        break;
      case "bottom-center":
        notificationDivElement.style.flexDirection = "column-reverse";
        notificationDivElement.style.bottom = 0;
        notificationDivElement.style.left = `calc(50% - ${
          notificationElementRect.width / 2
        }px)`;
        notificationDivElement.style.right = "unset";
        notificationDivElement.style.top = "unset";
        break;
      case "bottom-right":
        notificationDivElement.style.flexDirection = "column-reverse";
        notificationDivElement.style.bottom = 0;
        notificationDivElement.style.right = 0;
        notificationDivElement.style.left = "unset";
        notificationDivElement.style.top = "unset";
        break;
      default:
        return false;
    }

    setNotifications([...notifications, notificationElement]);
    setTimeout(() => {
      removeElement(notificationElement);
    }, ms);
  };

  return {
    showNotification,
  };
};

export default useNotification;
