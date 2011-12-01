package com.mesplus.DSN.services.dao.impl;

import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import oracle.jdbc.OracleTypes;

import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.mesplus.util.ElementMapper;
import com.mesplus.util.Enums.ReturnType;
import com.mesplus.util.ObjcetMapper;

public class SecfundefNt extends StoredProcedure {
	private static final String FAC_ID_PARAM = "fac_id";
	private static final String FUNC_GROUP_PARAM = "func_group";
	private static final String FUNC_CODE_PARAM = "func_code";
	private static final String FUNC_TYPE_PARAM = "func_type";
	public static final String CUR_REFER_PARAM = "cur.refer";

	private static final String SPROC_NAME = "P_ASECFUNDEF_NT";

	private static ReturnType RTYPE = ReturnType.NONE;

	public SecfundefNt(DataSource dataSource, ReturnType rType) throws SQLException {
		super(dataSource, SPROC_NAME);

		declareParameter(new SqlParameter(FAC_ID_PARAM, Types.VARCHAR));
		declareParameter(new SqlParameter(FUNC_GROUP_PARAM, Types.VARCHAR));
		declareParameter(new SqlParameter(FUNC_CODE_PARAM, Types.VARCHAR));
		declareParameter(new SqlParameter(FUNC_TYPE_PARAM, Types.VARCHAR));

		RTYPE = rType;

		if (RTYPE == ReturnType.OBJECT) {
			declareParameter(new SqlOutParameter(CUR_REFER_PARAM, OracleTypes.CURSOR, new ObjcetMapper()));
		} else if (RTYPE == ReturnType.ELEMENT) {
			declareParameter(new SqlOutParameter(CUR_REFER_PARAM, OracleTypes.CURSOR, new ElementMapper()));
		} else {
			throw new SQLException("ReturnType Error: " + RTYPE.toString());
		}

		compile();
	}

	public Map<String, Object> execute(String fac_id, String func_group, String func_code, String func_type) {
		Map<String, Object> inputs = new HashMap<String, Object>();
		inputs.put(FAC_ID_PARAM, fac_id);
		inputs.put(FUNC_GROUP_PARAM, func_group);
		inputs.put(FUNC_CODE_PARAM, func_code);
		inputs.put(FUNC_TYPE_PARAM, func_type);

		return super.execute(inputs);
	}
}
