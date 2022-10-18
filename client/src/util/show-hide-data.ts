export default function showHideData(dataType: string): any {
  const data = document.querySelector(`#${dataType}`);
  if(!data) return;
  data.classList.toggle('d-none');
}
