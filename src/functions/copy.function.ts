// Copy function //
export const handleCopy = (content: any, setCopied: any) => {
  navigator.clipboard.writeText(content);
  setCopied(true);

  // Reset copied state after a short delay //
  setTimeout(() => {
    setCopied(false);
  }, 1000);
};
