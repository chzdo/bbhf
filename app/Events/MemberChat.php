<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MemberChat implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $message;
    private $group;
    public function __construct($message,$group)
    {
        $this->message = $message;
        $this->group = $group;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {

        if($this->group == 1){
        return new PresenceChannel('vol-chat');
        }else if($this->group == 2){
            return new PresenceChannel('mem-chat');
        }else if ($this->group == 3){
            return new PresenceChannel('spon-chat');
        }else if ($this->group == 4){
            return new PresenceChannel('adm-chat');
        }
      
    }
}
