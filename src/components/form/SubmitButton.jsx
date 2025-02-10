import { Button } from "@nextui-org/react";

function SubmitButton({ children, ...props }) {
  return (
    <Button
      type="submit"
      className="w-full text-sm px-4 py-3 bg-purple-600 text-white rounded-xl h-auto hover:!bg-purple-500 hover:!opacity-100"
      {...props}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
