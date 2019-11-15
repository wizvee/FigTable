package com.kh.figtable.common;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

public class StringArrayResHandler implements TypeHandler<String[]>{

	@Override
	public void setParameter(PreparedStatement ps, int i, String[] parameter, JdbcType jdbcType) throws SQLException {
		if(parameter != null) {
			ps.setString(i, String.join("#%", parameter));
		} else {
			ps.setString(i, "");
		}
	}

	@Override
	public String[] getResult(ResultSet rs, String columnName) throws SQLException {
		String temp = rs.getString(columnName);
		if(temp == null) {
			return null;
		}
		return temp.split("#%");
	}

	@Override
	public String[] getResult(ResultSet rs, int columnIndex) throws SQLException {
		String temp = rs.getString(columnIndex);
		if(temp == null) {
			return null;
		}
		return temp.split("#%");
	}

	@Override
	public String[] getResult(CallableStatement cs, int columnIndex) throws SQLException {
		String temp = cs.getString(columnIndex);
		if(temp == null) {
			return null;
		}
		return temp.split("#%");
	}

	
}
