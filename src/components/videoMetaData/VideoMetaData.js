import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './_videoMetaData.scss';
import { AiFillEye } from 'react-icons/ai';
import moment from 'moment';
import numeral from 'numeral';
import {MdThumbUp, MdThumbDown} from 'react-icons/md'
import ShowMoreText from 'react-show-more-text' 
import {getChannelDetails , checkSubscriptionStatus} from '../../redux/actions/channel.action'

const VideoMetaData = ({video:{snippet,statistics} ,videoId}) => {

   const dispatch = useDispatch()

   const { channelId, channelTitle, description, title, publishedAt } = snippet
   const { viewCount, likeCount, dislikeCount } = statistics;

   const {
      snippet: channelSnippet,
      statistics: channelStatistics,
   } = useSelector(state => state.channelDetails.channel);

   const subscriptionStatus = useSelector(
      state => state.channelDetails.subscriptionStatus
   )
   
  
   useEffect(() => {

      dispatch(getChannelDetails(channelId));
      
      dispatch(checkSubscriptionStatus(channelId))
   }, [dispatch ,channelId])

    return (
        <div className='videoMetaData py-2'>
            <div className='videoMetaData__top'>
                <h5>{title}</h5>
                <div className='d-flex justify-content-between align-items-center py-1'>
                    <span>
                        <AiFillEye /> {numeral(viewCount).format('0.a')}Views•
                         {moment(publishedAt).fromNow()}</span>
               
                <div>
                    <span className='mr-3'>
                        <MdThumbUp size={26}/> {numeral(likeCount).format('0.a')}
                    </span>
                    <span className='mr-3'>
                        <MdThumbDown size={26}/>{' '} {numeral(dislikeCount).format('0.a')}
                    </span>

                </div>
            </div>
            </div>
            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
            <div className='d-flex'>
               <img
                   src={channelSnippet?.thumbnails?.default?.url}
                     alt=''
                  className=' mr-3  rounded-circle'
               />
               <div className='d-flex flex-column'>
                  <span>{channelTitle}</span>
                  <span>
                     {' '}
                     {numeral(channelStatistics?.subscriberCount).format(
                        '0.a'
                     )}{' '}
                     Subscribers
                  </span>
               </div>
        
            </div>
            <button
               className={`p-2 m-2 border-0 btn ${
                  subscriptionStatus && 'btn-gray' }`}>
               {subscriptionStatus? 'Subscribed' : ' OyeSubscribe'}
            </button>
       
         </div>
         <div className='videoMetaData__description'>
            <ShowMoreText
               lines={3}
               more='SHOW MORE'
               less='SHOW LESS'
               anchorClass='showMoreText'
               expanded={false}>
                        {description}
            </ShowMoreText>
         </div>
      </div>
    

        
    )
}

export default VideoMetaData
