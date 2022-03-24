import React, { ReactNode } from 'react';
import { AppLayout, Spinner } from 'components/common';
import Item from 'components/item';
import Error from 'pages/_error';
import { get } from 'apis/requestAPIs/items';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ItemPage = () => {
  const router = useRouter();
  const { conItemId } = router.query;

  const { data: ItemInfo, error } = useSWR(conItemId, (conItemId: string) => get.items(conItemId));

  if (error) {
    return <Error statusCode={error.response.status} />;
  } else if (!ItemInfo) {
    return <Spinner />;
  } else {
    return <Item data={ItemInfo.conItem}></Item>;
  }
};

ItemPage.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};

export default ItemPage;