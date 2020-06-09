import React from 'react';
import { Popover } from 'react-bootstrap';


export const popover = ( content ) => (
    <Popover className="m-3 p-2" id="popover-basic">
        <Popover.Content>
            { content }
        </Popover.Content>
    </Popover>
);