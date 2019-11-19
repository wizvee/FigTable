package com.kh.figtable.common;

public class DistanceHandler {

	public static double calDistance(double lat1, double lon1, double lat2, double lon2) {
		double theta = lon1 - lon2;
		double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))
				+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
		dist = Math.acos(dist);
		dist = rad2deg(dist);

		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344; // 단위 mile 에서 km 변환.

		return dist;
	}

	// 주어진 도(degree) 값을 라디언으로 변환
	public static double deg2rad(double deg) {
		return (deg * Math.PI / 180);
	}

	// 주어진 라디언(radian) 값을 도(degree) 값으로 변환
	public static double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}

}
