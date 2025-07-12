export const styles = {
    wrapper: {
        position: "relative", // Needed for absolute children
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "32px",
        paddingBottom: "80px",
        minHeight: "100vh",
        overflow: "hidden", // optional
        width: '100%'
    },
    heading: {
        fontSize: "32px",
        zIndex: 1,
    },
    left1: {
        position: "absolute",
        top: "100px",
        left: "50px",
        width: "200px", zIndex: 1,
    },
    left2: {
        position: "absolute",
        top: "500px",
        left: "300px",
        width: "80px",
        zIndex: 1,
    },
    left3: {
        position: "absolute",
        bottom: "250px",
        left: "-50px",
        width: "150px",
        zIndex: 1,
    },
    right1: {
        position: "absolute",
        bottom: "50px",
        right: "50px",
        width: "120px",
        zIndex: 1,
    },
    right2: {
        position: "absolute",
        top: "600px",
        right: "300px",
        width: "100px",
        zIndex: 1,
    },
    right3: {
        position: "absolute",
        top: "00px",
        right: "-150px",
        width: "400px",
        zIndex: 1,
    },
};