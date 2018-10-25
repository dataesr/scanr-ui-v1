export default function colorStatus(status) {
  let color = '';
  switch (status) {
    case 'old':
      color = 'old_bg_color';
      break;
    case 'main':
      color = 'main_bg_color';
      break;
    case 'active':
      color = 'active_bg_color';
      break;
    case 'conflict':
      color = 'conflict_bg_color';
      break;
    default:
      color = 'undefined_bg_color';
  }

  return color;
}
