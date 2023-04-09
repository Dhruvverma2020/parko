import { createContext } from "react";

const notifications = [
    ["Warning", "Your Parking Ticket has been timed out", "1d"]
];

export default NotificationsContext = createContext({
    notifications: notifications
});

export { notifications };
