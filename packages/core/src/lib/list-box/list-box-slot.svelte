<script lang="ts">
import { ListBox } from '$lib';

const defaultProps = {
  disabled: false,
  left: 'leftText1,leftText2,leftText3',
  right: 'rightText1,rightText2,rightText3',
  leftlabel: 'Left',
  rightlabel: 'Right',
  height: '200px',
  suffix: false,
};
</script>

<ListBox {...defaultProps}>
  <div slot="left-empty">Your left box is empty</div>
  <div slot="right-empty">Your right box is empty</div>
</ListBox>
