CREATE TABLE `experience_seats` (
	`service_id` text NOT NULL,
	`day` text NOT NULL,
	`time` text NOT NULL,
	`seat` integer NOT NULL,
	`booking_id` text NOT NULL,
	PRIMARY KEY(`service_id`, `day`, `time`, `seat`),
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `experience_booking` ON `experience_seats` (`booking_id`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`price` integer NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE `bookings` ADD `extras_json` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `kind` text DEFAULT 'stay' NOT NULL;