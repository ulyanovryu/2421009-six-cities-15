import {ReviewsType, Review} from '../../types/reviews.ts';

import {APIRoute} from '../../const';
import {OfferDetail} from '../../types/offers.ts';
import {createAppAsyncThunk} from '../../hooks';

type AddCommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: OfferDetail['id'];
}

export const fetchCommentsAction = createAppAsyncThunk<ReviewsType, string>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<ReviewsType>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export const addCommentAction = createAppAsyncThunk<Review, AddCommentProps>(
  'data/addComment',
  async ({body, offerId}, {extra: api}) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, body);
    return response.data;
  },
);
