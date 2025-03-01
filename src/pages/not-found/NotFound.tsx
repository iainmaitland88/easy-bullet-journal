export function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <img
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGpqcnFjaHIxazNhOGthb2tobnk3eWh1MWVmMDBodWtiZ2txZzVvcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g01ZnwAUvutuK8GIQn/giphy.gif"
        alt="404 Not Found"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
