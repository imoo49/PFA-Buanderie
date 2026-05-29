<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class FinCycleImminente extends Notification
{
    use Queueable;

    public function __construct(
        public string $machineName,
        public string $heureFin
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', WebPushChannel::class];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'message'   => "Votre machine {$this->machineName} se libère dans 15 min (à {$this->heureFin})",
            'machine'   => $this->machineName,
            'heure_fin' => $this->heureFin,
            'type'      => 'fin_cycle_imminente',
        ];
    }

    public function toWebPush($notifiable, $notification): WebPushMessage
    {
        return (new WebPushMessage)
            ->title('⏰ Buanderie ENSIAS')
            ->body("Votre machine {$this->machineName} se libère dans 15 min (à {$this->heureFin}) !");
    }
}