import React from 'react';
import {UncontrolledCarousel} from 'reactstrap';

const SlideShow = () => {
    return <UncontrolledCarousel interval='3000'
    items={[
      {
        key: 1,
        src: 'https://cdn.discordapp.com/attachments/910012517718302731/981451175121518642/thongtinfull_1.png'
      },
      {
        key: 2,
        src: 'https://cdn.discordapp.com/attachments/910012517718302731/981451270990737458/chamcongfull_1.png'
      },
      {
        key: 3,
        src: 'https://cdn.discordapp.com/attachments/910012517718302731/981451134810062858/bangluongfull_1.png'
      }
    ]}
   />
}

export default SlideShow