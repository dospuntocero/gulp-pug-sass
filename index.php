<?php

$request = $_SERVER['REQUEST_URI'];
//var_dump($request);
switch ($request) {
    case '/' :
    case '' :
        require __DIR__ . '/dist/index.html';
        break;
    case '/about-us' :
        require __DIR__ . '/dist/about.html';
        break;
	case '/about-us/deep-link' :
		require __DIR__ . '/dist/deep-link.html';
		break;

    default:
        require __DIR__ . '/dist/404.html';
        break;
}