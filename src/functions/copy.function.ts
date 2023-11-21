// Copy function //
export const handle_copy = (content: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
  navigator.clipboard.writeText(content);
  setCopied(true);

  // Reset copied state after a short delay //
  setTimeout(() => {
    setCopied(false);
  }, 1000);
};
