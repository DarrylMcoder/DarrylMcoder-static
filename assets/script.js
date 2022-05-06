function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function decrypt(crypted,key) {
        var alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
        var decrypted_str = "";
        var found = false;
        for(var i = 0; i < crypted.length; i++) {
          var crypted_val = crypted.charAt(i);
          for(var j = 0; j < key.length; j++){
            var key_val = key.charAt(j);
            var alpha_val = alpha.charAt(j);
            if(key_val == crypted_val) {
              decrypted_str += alpha_val;
              found = true;
            }
          }
          if(found != true) {
            decrypted_str += crypted_val;
          }
          found = false;
        }
        return decrypted_str;
      }



function loadLinks(url,id) {
  var linksHTML = '';
  fetch(url).then(res => {
    res.text().then(text => {
      return JSON.parse(text);
    }).then(links => {
      for (const [key, value] of Object.entries(links)) {
      linksHTML += '<a href=\"' + value + '\">' + key + '</a>  ';
    }
    var elem = document.getElementById(id);
      console.log(elem)
    elem.innerHTML += linksHTML;
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}




function newNotification() {
	var index = Math.floor(Math.random() * 4);
	switch (index) {
		case 0:
			createNotification(
				createRandomMessage(NotificationType.SUCCESS.title),
				NotificationType.SUCCESS
			);
			break;
		case 1:
			createNotification(
				createRandomMessage(NotificationType.INFO.title),
				NotificationType.INFO
			);
			break;
		case 2:
			createNotification(
				createRandomMessage(NotificationType.WARNING.title),
				NotificationType.WARNING
			);
			break;
		case 3:
			createNotification(
				createRandomMessage(NotificationType.CRITICAL.title),
				NotificationType.CRITICAL
			);
			break;
	}
}


class NotificationType {
	// Create new instances of the same class as static attributes
	static SUCCESS = new NotificationType(0, "Success", "notification-success");
	static INFO = new NotificationType(1, "Information", "notification-info");
	static WARNING = new NotificationType(2, "Warning", "notification-warning");
	static CRITICAL = new NotificationType(3, "Critical", "notification-critical");

	constructor(name, title, notificationClass) {
		this.name = name;
		this.title = title;
		this.notificationClass = notificationClass;
	}
}

function createNotification(message, type) {
	const title = type.title;
	const notificationClass = type.notificationClass;
	const notificationId = new Date().getTime();

	var notification = document.createElement("DIV");
	notification.classList.add("notification");
	notification.classList.add(notificationClass);
	notification.id = notificationId;
	notification.onmouseenter = function (event) {
		document.getElementById(notificationId).setAttribute("created-at", "-");
	};
	notification.onmouseleave = function (event) {
		document
			.getElementById(notificationId)
			.setAttribute("created-at", new Date().getTime());
	};

	var notificationLoader = document.createElement("DIV");
	notificationLoader.classList.add("notification-loader");

	var closeButton = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"svg"
	);
	closeButton.classList.add("close-button");
	closeButton.width = "15px";
	closeButton.height = "15px";
	closeButton.onclick = function (event) {
		document.getElementById(notificationId).remove();
	};

	var closeButtonLineA = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"line"
	);
	closeButtonLineA.setAttribute("x1", "3");
	closeButtonLineA.setAttribute("y1", "3");
	closeButtonLineA.setAttribute("x2", "12");
	closeButtonLineA.setAttribute("y2", "12");
	closeButton.appendChild(closeButtonLineA);
	var closeButtonLineB = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"line"
	);
	closeButtonLineB.setAttribute("x1", "3");
	closeButtonLineB.setAttribute("y1", "12");
	closeButtonLineB.setAttribute("x2", "12");
	closeButtonLineB.setAttribute("y2", "3");
	closeButton.appendChild(closeButtonLineB);

	var notificationTitle = document.createElement("SPAN");
	notificationTitle.classList.add("notification-title");
	notificationTitle.innerText = title;

	var notificationDescription = document.createElement("P");
	notificationDescription.classList.add("notification-text");
	notificationDescription.innerHTML = message;

	notification.appendChild(notificationLoader);
	notification.appendChild(closeButton);
	notification.appendChild(notificationTitle);
	notification.appendChild(notificationDescription);
	notification.setAttribute("created-at", new Date().getTime());
	document.getElementById("notifications").appendChild(notification);
	/*
  setTimeout(() => {
    const notification = document.getElementById(notificationId);
    notification?.remove();
  }, 10000); */
}

function checkNotifications() {
	const notifications = document.getElementsByClassName("notification");
	for (let i = 0; i < notifications.length; i++) {
		if (
			(new Date().getTime() - notifications[i].getAttribute("created-at")) / 1000 >
			10
		) {
			notifications[i].remove();
		}
	}
}

setInterval(function () {
	checkNotifications();
}, 100);
