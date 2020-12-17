type SpaceType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "auto";

export interface SpaceProps {
  m?: SpaceType;
  mt?: SpaceType;
  mb?: SpaceType;
  ml?: SpaceType;
  ml_lg?: SpaceType;
  mr?: SpaceType;
  mr_lg?: SpaceType;
  mx?: SpaceType;
  my?: SpaceType;
  p?: SpaceType;
  pt?: SpaceType;
  pb?: SpaceType;
  pl?: SpaceType;
  pr?: SpaceType;
  px?: SpaceType;
  py?: SpaceType;
}

export function propsToSpace(props: SpaceProps) {
  const {
    m,
    mt,
    mb,
    ml,
    ml_lg,
    mr,
    mr_lg,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
  } = props;

  delete props.m;
  delete props.mt;
  delete props.mb;
  delete props.ml;
  delete props.ml_lg;
  delete props.mr;
  delete props.mr_lg;
  delete props.mx;
  delete props.my;
  delete props.p;
  delete props.pt;
  delete props.pb;
  delete props.pl;
  delete props.pr;
  delete props.px;
  delete props.py;

  return {
    [`m-${m}`]: m != null,
    [`mt-${mt}`]: mt != null,
    [`mb-${mb}`]: mb != null,
    [`ml-${ml}`]: ml != null,
    [`ml-lg-${ml_lg}`]: ml_lg != null,
    [`mr-${mr}`]: mr != null,
    [`mr-lg-${mr_lg}`]: mr_lg != null,
    [`mx-${mx}`]: mx != null,
    [`my-${my}`]: my != null,
    [`p-${p}`]: p != null,
    [`pt-${pt}`]: pt != null,
    [`pb-${pb}`]: pb != null,
    [`pl-${pl}`]: pl != null,
    [`pr-${pr}`]: pr != null,
    [`px-${px}`]: px != null,
    [`py-${py}`]: py != null,
  };
}
