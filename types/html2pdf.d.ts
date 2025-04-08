declare module 'html2pdf.js' {
  export default function html2pdf(): {
    set(options: any): any;
    from(element: HTMLElement): any;
    save(): void;
  };
}
